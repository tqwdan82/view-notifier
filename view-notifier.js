const ViewNotifier = {
    _all_registered_config:[],
    //--------------------------------------------------------------------------
    registerModule: configuration => {

        // Function to load the html content in the file path to the DOM object
        const loadHtml = function(containerDom, filePath) {
            //formulate the html call configuration
            const htmlInit = {
                method : "GET",
                headers : { "Content-Type" : "text/html" },
                mode : "cors",
                cache : "default"
            };

            //create the call request object
            const reqHtml = new Request(filePath, htmlInit);

            //performs the retrieval
            fetch(reqHtml)
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                //set the dom's body
                containerDom.innerHTML = body;
            });
        }; 

        // Function to load the javascript to document
        const loadJs = function(filePath) {
            //formulate the html call configuration
            const jsInit = {
                method : "GET",
                headers : { "Content-Type" : "text/javascript" },
                mode : "cors",
                cache : "default"
            }

            //create the call request object
            const reqJs = new Request(filePath, jsInit);

            //performs the retrieval
            fetch(reqJs)
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                //loads script into document
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = filePath;
                script.onerror = function ()
                {
                    console.error('Error: Could not load script "' + this.src + '".');
                };
                document.getElementsByTagName("head")[0].appendChild(script);
    
            });
        };
        
        //check if input configuration is defined
        if(typeof configuration === 'undefined'){
            console.error("Error: Invalid input configuration");
            return;
        }

        //check if containerId is defined
        if(typeof configuration.containerId === 'undefined'){
            console.error("Error: Invalid containerId");
            return;
        }

        //check if listener is defined
        if(typeof configuration.listeners !== 'undefined'   //check if listeners are defined
            && !Array.isArray(configuration.listeners)){    //check if listeners are not array

            console.error("Error: Invalid listeners");
            return;

        }else if(typeof configuration.listeners !== 'undefined' //check if listeners are defined
            && Array.isArray(configuration.listeners)){         //check if listeners are  array
            
            var containerDom = document.getElementById(configuration.containerId);
            configuration.listeners.forEach(listenerConfig => {
                var listnerConfigValid = true;

                //check if the configs are valid
                //check if there is a valid topic
                if(listnerConfigValid 
                    && typeof listenerConfig.topic === 'undefined'  //check if the topic is defined
                    && listenerConfig.topic instanceof String){     //check if topic is a string
                    listnerConfigValid = false;
                }
                //check if there is a valid function
                if(listnerConfigValid 
                    && typeof listenerConfig.handler !== 'function' ){ //check if the hander is is a function
                    listnerConfigValid = false;
                }

                //add event listener if valid add event listener
                if(listnerConfigValid){
                    //add the event listener
                    containerDom.addEventListener(listenerConfig.topic, listenerConfig.handler);
                }else{
                    console.log('Warning: One or more event listener could not be created for container['+configuration.containerId+']');
                }
            });
        }

        //Render HTML into container if templateHtml is defined
        var htmlDefined = false;
        if(typeof configuration.templateHtml !== 'undefined'){
            var containerDom = document.getElementById(configuration.containerId);
            containerDom.innerHTML = configuration.templateHtml;
            htmlDefined = true;
        }

        //Render URL into container if templateURL is defined
        var loadHtmlPathCheck = false;
        if(!htmlDefined 
            && typeof configuration.templatePath !== 'undefined'){

                loadHtmlPathCheck = true;

        }else if (htmlDefined 
            && typeof configuration.templatePath !== 'undefined'){  //double configuration

            console.log('Warning: Both templateUrl and templateHtml have been defined. Will render templateUrl');
            loadHtmlPathCheck = true;  
            
        }
        //if to load html by path
        if(loadHtmlPathCheck){
            var containerDom = document.getElementById(configuration.containerId);
            loadHtml(containerDom, configuration.templatePath);
        }

        //check if templateScriptPaths are defined
        if(typeof configuration.templateScriptPaths !== 'undefined'   //check if templateScriptPaths are defined
            && !Array.isArray(configuration.templateScriptPaths)){    //check if templateScriptPaths are not array

            console.error("Error: Invalid template script paths");
            return;

        }else if(typeof configuration.templateScriptPaths !== 'undefined' //check if templateScriptPaths are defined
            && Array.isArray(configuration.templateScriptPaths)){         //check if templateScriptPaths are  array
            configuration.templateScriptPaths.forEach(script => {
                loadJs(script);
            });
        }

        //add configuration to list of all configurations
        ViewNotifier._all_registered_config[ViewNotifier._all_registered_config.length] = configuration;
    },
    //--------------------------------------------------------------------------
    publish: (topic, data) => {
        //check if is a valid topic
        if( typeof topic === 'undefined'  //check if the topic is defined
            && topic instanceof String){     //check if topic is a string
                console.error("Error: Invalid topic to publish message");
                return;
        }

        //create the event with the data
        const event = new CustomEvent(topic, data);

        //publish event
        ViewNotifier._all_registered_config.forEach(configuration => {
            var containerDom = document.getElementById(configuration.containerId);
            containerDom.dispatchEvent(event);
        });
    }
};

//freezes an object. A frozen object can no longer be changed
Object.freeze(ViewNotifier);