document.addEventListener('DOMContentLoaded', function () {
    const webAppsContent = getAllWebAppsContent();
    const nativeAppsContent = getAllNativeAppsContent();
    const mobileAppsContent = getAllMobileAppsContent();
    const webCheckbox = document.getElementById('ch1');
    const nativeCheckbox = document.getElementById('ch2');
    const mobileCheckbox = document.getElementById('ch3');
    console.log(webAppsContent);
    webCheckbox.addEventListener('change', function () {
        webAppsContent.forEach(el => {
            el.style.display = this.checked ? 'block' : 'none';
            AOS.refresh();
        });
    });
    nativeCheckbox.addEventListener('change', function () {
        nativeAppsContent.forEach(el => {
            el.style.display = this.checked ? 'block' : 'none';
            AOS.refresh();
        });
    });
    mobileCheckbox.addEventListener('change', function () {
        mobileAppsContent.forEach(el => {
            el.style.display = this.checked ? 'block' : 'none';
            AOS.refresh();
        });
    });

});

function getAllWebAppsContent() {
    //CHANGE THIS WHEN YOU ADD A PROJECT TO PORTFOLIO
    const webProjectsTitles = ['MERN fullstack data Website', 'Fullstack Appointments Website', 'Colours Game', 'Nasa image Browser']

    const webAppTitleElement = Array.from(document.querySelectorAll('p')).find(el => el.innerHTML.trim() === 'Web Apps');

    const webAppContent = [webAppTitleElement];

    Array.from(document.querySelectorAll('.projectContainer')).forEach(container => {
        const projectTitleElement = container.querySelector('.projectTitle');
        if (projectTitleElement && webProjectsTitles.includes(projectTitleElement.innerHTML.trim())) {
            webAppContent.push(container.parentElement.parentElement);
        }
    });
    return webAppContent;
}
function getAllNativeAppsContent() {
    //CHANGE THIS WHEN YOU ADD A PROJECT TO PORTFOLIO
    const nativeProjectsTitles = [
        "PaintDrops Simulation",
        "Recipe App (UI)",
        "Virtual Inventory System",
        "Virtual Superstore System",
        "Black Jack Console Game"
    ];
    const nativeAppsTitleElement = Array.from(document.querySelectorAll('p')).find(el => el.innerHTML.trim() === 'Native Apps');

    const nativeAppsContent = [nativeAppsTitleElement];

    Array.from(document.querySelectorAll('.projectContainer')).forEach(container => {
        const projectTitleElement = container.querySelector('.projectTitle');
        if (projectTitleElement && nativeProjectsTitles.includes(projectTitleElement.innerHTML.trim())) {
            nativeAppsContent.push(container.parentElement.parentElement);
        }
    });
  
    return nativeAppsContent;
}
function getAllMobileAppsContent() {
    // CHANGE THIS WHEN YOU ADD A PROJECT TO PORTFOLIO
    const mobileProjectsTitles = [
        "Book Reading App"
    ];
    const mobileAppsTitleElement = Array.from(document.querySelectorAll('p')).find(el => el.innerHTML.trim() === 'Mobile Apps');

    const mobileAppsContent = [mobileAppsTitleElement];

    Array.from(document.querySelectorAll('.projectContainer')).forEach(container => {
        const projectTitleElement = container.querySelector('.projectTitle');
        if (projectTitleElement && mobileProjectsTitles.includes(projectTitleElement.innerHTML.trim())) {
            mobileAppsContent.push(container.parentElement.parentElement);
        }
    });
    return mobileAppsContent;
}
