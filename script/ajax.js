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

    fetchImages(){

        
    }


}


let newsContent = new newsFeed();
newsContent.fetcFeed();

class webWorker{
    constructor(){

    }

    passWorker(){
        if(window.Worker){
            let pulseWorker = new Worker("/contentworker.js");
            pulseWorker.postMessage()
        }
    }
}





    
