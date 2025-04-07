// Legacy fallback script for browsers that don't support ES modules
(function() {
  // Check if browser is too old to run the app
  var isTooOld = !('fetch' in window) || 
                !('Promise' in window) || 
                !('assign' in Object) || 
                !('forEach' in Array.prototype);
  
  if (isTooOld) {
    // Show a message for older browsers
    var outdatedMessage = document.createElement('div');
    outdatedMessage.style.padding = '20px';
    outdatedMessage.style.maxWidth = '600px';
    outdatedMessage.style.margin = '40px auto';
    outdatedMessage.style.backgroundColor = '#f8f8f8';
    outdatedMessage.style.border = '1px solid #ddd';
    outdatedMessage.style.borderRadius = '4px';
    outdatedMessage.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
    
    outdatedMessage.innerHTML = '<h2 style="color: #333; margin-top: 0;">Your browser is outdated</h2>' +
                              '<p>Sorry, your browser is too old to run this application properly. ' +
                              'For the best experience, please use a modern browser like:</p>' +
                              '<ul>' +
                              '<li><a href="https://www.google.com/chrome/">Chrome</a></li>' +
                              '<li><a href="https://www.mozilla.org/firefox/">Firefox</a></li>' +
                              '<li><a href="https://www.apple.com/safari/">Safari</a></li>' +
                              '<li><a href="https://www.microsoft.com/edge">Edge</a></li>' +
                              '</ul>';
    
    // Find the main container
    var root = document.getElementById('root');
    if (root) {
      root.appendChild(outdatedMessage);
    } else {
      document.body.appendChild(outdatedMessage);
    }
  }
})(); 