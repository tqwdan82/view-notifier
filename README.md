# View-Notifier
A JavaScript library that provides custom event listener addition and handler. View-Notifier is developed to assist developers in developing more interactive views, allowing more interaction and responses between DOM elements using JavaScript HTML DOM Events. This library is written in vanilla JavaScript using JavaScript DOM APIs.

## Getting Started

Download view-notifier.js and include the script to your script directory/location

### Steps to Setting Up
1. Include the view-notifier.js JavaScript library in your page.
```
<script src="view-notifier.js" type="text/javascript"></script>
```

2. Define your module configurations and the corresponding DOM elements on your page
Configuration Example
```
 var configuration = {
    'containerId':'number',
    'templatePath':'/template/template.html',
    'listeners':[
        {
            'topic':'numberChanged',
            'handler':function(e){
                        this.querySelector("#someid").textContent = e.detail.number;
                        this.querySelector("#someid").style.color = e.detail.textColor;
                    }
        }
    ]
};
```
   Configuration Definitions
   - containerId  : ID of the DOM Container on your page
   - templateScriptPaths : Array of all JavaScript that is required by your template html
   - listeners : Array of JSON object defining the event name, that the container is listening, and your function that is to executed when the event is triggered
   - HTML Template
     - templatePath : URI of your HTML path that will be rendered in the DOM Container 
       ```
       'templatePath':'/template/template.html',
       ```
     OR
     - templateHtml : HTML that will be rendered in the DOM Container
       ```
       'templateHtml':'<h1>Test Section</h1><p>Content</p>'
       ```
        If both are set, templateHtml shall be ignored
3. Register your module configurations with View-Notifier at the end of your ``` document ```
```
ViewNotifier.registerModule(configuration);
```

## Sample
Look in the sample directory for a sample. Sample is required to be run on a Webserver.

## Built With

* [Visual Code] - IDE
* [NodeJs HTTP Server] - Webserver

## Authors

* **Tay Qiaowei** - *Initial work* - [tqwdan82](https://github.com/tqwdan82)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project, if any.

## License

This project is free to use.
