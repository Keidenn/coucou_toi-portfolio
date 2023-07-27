var container = document.getElementById('container');
var scrolling = false;
var scrollAmount = 100;
var scrollThreshold = 1000;

container.addEventListener('wheel', function (event) {
    event.preventDefault();

    if (!scrolling) {
        scrolling = true;
        var direction = (event.deltaY > 0) ? 1 : -1;
        scrollAmount = 0;

        scrollInterval = setInterval(function () {
            scrollAmount += 50 * direction;

            if (Math.abs(scrollAmount) >= scrollThreshold) {
                clearInterval(scrollInterval);
                scrolling = false;
            }

            container.scrollLeft += scrollAmount;
        }, 0.5);
    }
});

function initHeaderLinks() {
    var links = document.querySelectorAll('.header a');
    var activeLink = null;


    function setActiveLink(link) {
        if (activeLink !== null) {
            activeLink.style.color = '#888';
        }
        link.style.color = '#ff7676';
        activeLink = link;
    }

    function updateHoverEffect() {
        links.forEach(function (link) {
            link.addEventListener('mouseenter', function (event) {
                if (activeLink !== this) {
                    this.style.color = '#ff7676';
                }
            });

            link.addEventListener('mouseleave', function (event) {
                if (activeLink !== this) {
                    this.style.color = '#888';
                }
            });
        });
    }


    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var targetId = this.getAttribute('href').slice(1);
            var targetElement = document.getElementById(targetId);
            var yOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;

            setActiveLink(this);


            window.scrollTo({
                top: yOffset,
                behavior: 'smooth'
            });

            history.pushState({}, '', '#' + targetId);
        });
    });


    function checkScrollPosition() {
        var sections = document.querySelectorAll('div[id]');
        var activeSection = null;

        sections.forEach(function (section) {
            var sectionTop = section.getBoundingClientRect().top;
            var sectionBottom = section.getBoundingClientRect().bottom;
            if (sectionTop <= 0 && sectionBottom > 0) {
                activeSection = section;
            }
        });

        if (activeSection !== null) {
            var targetId = activeSection.getAttribute('id');
            var activeLink = document.querySelector('.header a[href="#' + targetId + '"]');
            setActiveLink(activeLink);
        }
    }


    window.addEventListener('load', function () {
        var currentSectionId = window.location.hash.slice(1);
        var currentLink = document.querySelector('.header a[href="#' + currentSectionId + '"]');
        if (currentLink) {
            setActiveLink(currentLink);
        }
        updateHoverEffect();
    });


    window.addEventListener('scroll', function () {
        checkScrollPosition();
        updateHoverEffect();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    initHeaderLinks();
});
