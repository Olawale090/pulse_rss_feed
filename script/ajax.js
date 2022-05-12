class newsFeed {
    
    constructor(){

        this.content = document.querySelector(".content");

    }


    fetcFeed(){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:1010/query_string',true);

        xhr.onload = ()=>{
            if (xhr.status === 200) {

                let news = JSON.parse(xhr.responseText);
                console.log(news.items[0].content.split("<p> </p>"));

                this.content.innerHTML = news.items[0].content;

               
            } else if(this.status === 404) {
                alert("page not found ");
            }
            
        }

        xhr.send();

    }

    passImageWorker(){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:1010/query_string',true);

        xhr.onload = ()=>{
            if (xhr.status === 200) {

                let news = JSON.parse(xhr.responseText);
                if(window.Worker){
                    let pulseWorker = new Worker("/contentworker.js");
                    pulseWorker.postMessage(news)
                }
               
            } else if(this.status === 404) {
                alert("page not found ");
            }
        }

    }

    
}


let newsContent = new newsFeed();
newsContent.fetcFeed();
newsContent.fetchImages()







    
