# Cowin Notify (Browser-Based Notification only)

## A simple Indian pincode based vaccine availability monitor for web-browser.

This website use [CoWIN](https://www.cowin.gov.in/home) India API to monitor vaccine availability in india.

## Requirement

> Latest Desktop Chrome browser (Tested only in this now)

## How does it works?

Nothing complicated its really simple actually I have only used HTML and Javascript to build this website along with I am using Co-WIN Public APIs to interact with government servers. These API's are open for public developer community to interact basically anyone can do this, and govt encourage people to create new solution with these API's. Checkout [here](https://apisetu.gov.in/public/api/cowin)

## How to use?
- Go to [https://shinojshayin.github.io/cowinnotify/](https://shinojshayin.github.io/cowinnotify/) (DEPRECATED: This url no longer provide service)
- When the website load it will initially ask for show notification permission please allow it
![alt text](https://raw.githubusercontent.com/ShinojShayin/cowinnotify/main/allowpermission.png)
- Provide pincode this action will list vaccine center available in that area
- User can select any specific vaccination center this part is optional
- Press on 'Start Checking' button to monitor vaccine availability based on the interval set (Default is 2 seconds) it will ping on cowin server which provide details releated to vaccine
- Once checking/monitoring is started it will print the report of availability status in the screen real-time
- If vaccine is found to be available it will play a alert song along with it will trigger a browser notification (Work better in Chrome) 

![alt text](https://raw.githubusercontent.com/ShinojShayin/cowinnotify/main/desktopnotification.png)

This is how it look while monitoring for vaccine availability.
In the below image its looking for vaccine availability in pincode: 560066 and 'Manipal Hospital'

![alt text](https://raw.githubusercontent.com/ShinojShayin/cowinnotify/main/sample-page.png)



