<?php

namespace App\Utils;


class WWWAddress
{
    protected $domain;
    protected $uri;

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
        ]);
    }

    public function __construct($params = [])
    {
        $this->domain = (isset($params['domain'])) ? $params['domain'] : null;
        $this->uri = (isset($params['uri'])) ? $params['uri'] : null;
    }

    public function isOk()
    {
        return $this->hasDomain();
    }

    public function getDomain()
    {
        return $this->domain;
    }

    public function getUri($default = null)
    {
        return (isset($default) && !$this->hasUri())
            ? $default
            : $this->uri;
    }


    public function hasDomain()
    {
        return isset($this->domain);
    }

    public function hasUri()
    {
        return isset($this->uri);
    }
}