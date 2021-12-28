const app = () =>{
    const song = document.querySelector('.songs');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sound
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time
    const timeDisplay = document.querySelector('.time-display');
    //outline Length
    const outlineLength = outline.getTotalLength();
   // console.log(outlineLength);
   const timeSelect = document.querySelectorAll('.time-select button');

   let fakeDuration = 600;

   outline.style.strokeDasharray = outlineLength;
   outline.style.strokeDashoffset = outlineLength;

   //pick different sound
   sounds.forEach(sound =>{
       sound.addEventListener('click', function(){
           song.src = this.getAttribute('data-sound');
           video.src = this.getAttribute('data-video');
           checkPlaying(song);
       })
   })

   play.addEventListener("click", () =>{
     checkPlaying(song);
     //song.play();
   });

   timeSelect.forEach(option =>{
       option.addEventListener('click', function(){
           fakeDuration = this.getAttribute('data-time');
           timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:
           ${Math.floor(fakeDuration % 60)}`;
       });
   });


   //function to play and pause the song
   const checkPlaying = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    }else{
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
   };

   //animate the circle
   song.ontimeupdate = ()=>{
       let currentTime = song.currentTime;//indicates from how long song is playing, Indicates song kb se play ho rha hai. Kitne time se song play ho rha hai..
       let elapsed = fakeDuration - currentTime;//time elapsed as per time selected
       let second = Math.floor(elapsed % 60);
       let minute = Math.floor(elapsed / 60);

       let progress = outlineLength - (currentTime/fakeDuration)  * outlineLength;
       outline.style.strokeDashoffset = progress;

       timeDisplay.textContent =  `${minute}:${second}`;

       if(currentTime >= fakeDuration)
       {//If time from song playing is more than time selected
       // stop song and video. Reset everything.
       song.pause();
       song.currentTime = 0;
       play.src = "./svg/play.svg";
       video.pause();
       }
   }
  
}

app();