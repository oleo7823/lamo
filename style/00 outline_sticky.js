window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    var article = document.querySelector('article');
    var outline = document.querySelector('.outline');
    var navRect = nav.getBoundingClientRect();
    var articleRect = article.getBoundingClientRect();
    var outlineRect = outline.getBoundingClientRect();
    
    // Determine if the article is below the sticky nav
    var navBottom = navRect.bottom;
    var articleTop = articleRect.top;
    var outlineHeight = outlineRect.height;

    if (articleTop < navBottom) {
        // Article is below the nav, fix the outline below the nav
        outline.style.position = 'fixed';
        outline.style.top = (navBottom) + 'px';
        outline.style.left = '0';
    } else {
        // Article is above the nav, keep the outline in its place
        outline.style.position = 'absolute';
        outline.style.top = '0'; // Reset to original position
        outline.style.left = '0';
    }
});