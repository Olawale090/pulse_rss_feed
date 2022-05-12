class webWorker{
    constructor(){

    }

    workerFilter(){
       this.onmessage=(e)=>{

           if(e.data.news !== undefined){

               for (const i in news) {
                   return i;
               }

               pulseworker.onmessage = function(e){
                   console.dir(e.data.result);
                   console.log(e.data.result);
               };
           }
       }
    }
}

const pulseWebWorker = new webWorker();
pulseWebWorker.workerFilter();