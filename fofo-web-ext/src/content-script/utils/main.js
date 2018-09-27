export default function(callback) {
  if (window === top){ 
    callback();
  }
}