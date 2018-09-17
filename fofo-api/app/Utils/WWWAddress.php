<?php

namespace App\Utils;


class WWWAddress
{
    protected $domain;
    protected $uri;
    protected $fragment;

    public static function ok($url)
    {
        $address = static::from($url);
        return $address->isOk();
    }
    public static function from($url)
    {
        $parts = parse_url('//' . $url);

        return new static([
            'domain' => (isset($parts['host'])) ? $parts['host'] : null,
            'uri' => (isset($parts['path'])) ? $parts['path'] : null,
            'fragment' => (isset($parts['fragment'])) ? $parts['fragment'] : null,
        ]);
    }

    public function __construct($params = [])
    {
        $this->setDomain((isset($params['domain'])) ? $params['domain'] : null);
        $this->setUri((isset($params['uri'])) ? $params['uri'] : null);
        $this->setFragment((isset($params['fragment'])) ? $params['fragment'] : null);
    }


    private function scrap($protocol)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $protocol . '://' . $this->getHref());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36');
        $res = curl_exec($ch);
        curl_close($ch);

        return $res;
    }

    public function getHtml()
    {
        $html = $this->scrap('http');

        if(!$html) {
            return false;
        }

        $internalErrors = libxml_use_internal_errors(true);

        $dom  = new \DOMDocument();
        @$dom->loadHTML($html);

        libxml_use_internal_errors($internalErrors);

        return $dom;
    }

    public function findTitle()
    {
        if($this->isChannel()) {
            return 'Channel ' . $this->getChannel();
        }

        $dom = $this->getHtml();

        if(!$dom || !$dom->childNodes->length) {
            return $this->getHref();
        }

        $node = $dom->getElementsByTagName('title');
        if(!$node) {
            return $this->getHref();
        }

        return $node->item(0)->nodeValue;
    }

    public function isOk()
    {
        return $this->hasDomain();
    }

    public function isChannel()
    {
        return !!$this->getChannel();
    }

    public function getChannel()
    {
        if($this->uri && $this->uri === '/_channel:') {
            return $this->fragment;
        }

        return false;
    }


    public function getDomain()
    {
        return $this->domain;
    }

    public function getHref()
    {
        return $this->domain . $this->uri;
    }

    public function getUri()
    {
        if($this->isChannel()) {
            return $this->uri . '#' .$this->getChannel();
        }

        if(!$this->hasUri()) {
            return '';
        }

        // Laravel does not recognize ending slash
        /*if(ends_with($this->uri, '/')) {
            return substr($this->uri, 0, -1);
        }*/

        return $this->uri;

    }

    public function hasDomain()
    {
        return isset($this->domain);
    }

    public function hasUri()
    {
        return isset($this->uri);
    }

    public function setDomain($domain)
    {
        $this->domain = (isset($domain) && strpos($domain, '.') !== false)
            ? $domain
            : null;
    }

    public function setUri($uri)
    {
        $this->uri = $uri;
    }

    public function setFragment($fragment)
    {
        $this->fragment = $fragment;
    }


}