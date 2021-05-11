# Cowin Notify (Browser-Based Notification only)

## A simple Indian pincode based vaccine availability monitor for web-browser.

This website use [CoWIN](https://www.cowin.gov.in/home) India API to monitor vaccine availability in india.

## Requirement

> Latest Desktop Chrome browser (Tested only in this now)

## How to use
- Go to [https://shinojshayin.github.io/cowinnotify/](https://shinojshayin.github.io/cowinnotify/)
- When the website load it will initially ask for show notification permission please allow it
![alt text](https://raw.githubusercontent.com/ShinojShayin/cowinnotify/main/allowpermission.png)
- Provide pincode this action will list vaccine center available in that area
- User can select any specific vaccination center this part is optional
- Press on 'Start Checking' button to monitor vaccine availability based on the interval set (Default is 2 seconds) it will ping on cowin server which provide details releated to vaccine
- Once checking/monitoring is started it will print the report of availability status in the screen real-time
- If vaccine is found to be available it will play a alert song along with it will trigger a browser notification (Work better in Chrome) 

![alt text](https://raw.githubusercontent.com/ShinojShayin/cowinnotify/main/desktopnotification.png)



