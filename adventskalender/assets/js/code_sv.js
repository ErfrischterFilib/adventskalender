document.addEventListener("DOMContentLoaded", function() {
    //console.log("doc ready");
    let adventsDate = new Date();
    let adventsMonth = adventsDate.getUTCMonth() + 1;
    let adventsDay = adventsDate.getUTCDate();

    //console.log(adventsDate);

    //TEST
    adventsDay = 24;
    adventsMonth = 12;

    launchAdventCalendar(adventsDay, adventsMonth);


    function launchAdventCalendar(adventDay) {
        //console.log("launch prepareAdventCalendar", adventDay);

        //START CALENDER ON 1. DEZEMBER
        if (adventsMonth == 12) {

            handleHeaderImage(adventDay);

            //prepare date related contend
            prepareDateRelatedContent(adventDay);

        } else {
            adventDay = 1;
        }

        //callback
        initializeAdventCalendar(adventDay);

    }

    function handleHeaderImage(adventDay) {
        //console.log("handleHeaderImage", adventDay);

        $("#adventsheader-image").removeAttr("srcset");
        $("#adventsheader-image").attr("src", "https://transfer.digitalmaterial.ch/sv/" + adventDay  + "_header.jpg");

    }

    function prepareDateRelatedContent(adventDay) {
        //console.log("launch prepareDateRelatedContent");

        //bis index < adventDay: Change "JPG Closed" with "GIF OPEN"
        //MAIN: SRC AUSLESEN UNNÖTIG -> IST JA INDEX

        //LOOP MAIN CAROUSEL
        $("#thumbCarousel .carousel__slide img").each(function(index) {
            if (index < adventDay) {
                //ENABLE OPEN DOOR
                //console.log("slide src", $(this).attr("src"));
                let openSrc = $(this).attr("src");
                //console.log("replace 1", openSrc);
                //console.log("replace 2", openSrc.replace('closed', 'open'));

                // apply change to thumbnail
                $(this).attr("src", $(this).attr("src").replace('closed', 'open'));

                // apply change to main carousel
                let dayIterate = index + 1;
                let gifFile = "https://transfer.digitalmaterial.ch/sv/" + dayIterate  + "_open_large.gif";
                //console.log("prepare gifFile", index, gifFile);
                $("#mainCarousel .carousel__slide img").eq(index).attr("data-lazy-src", gifFile);
                $("#mainCarousel .carousel__slide span").eq(index).css("display", "inline-block");

            }
        });


    }


    function replayGif(pageIndex) {
        //console.log("re trigger gif", pageIndex);
        // 3. Advent = pageIndex "2"
        //let dayIterate = pageIndex + 1;
        //let gifFileRefresh = "https://transfer.digitalmaterial.ch/sv/" + dayIterate  + "_open_large.gif";
        //     console.log("prepare gifFile", index, gifFile);
        //      $("#mainCarousel .carousel__slide img").eq(pageIndex).attr("data-lazy-src", gifFile);

        let gifFileRefresh = $("#mainCarousel .carousel__slide img").eq(pageIndex).attr("data-lazy-src");
        console.log("gif file to replay", pageIndex, gifFileRefresh)

        $("#mainCarousel .carousel__slide img").eq(pageIndex).attr("data-lazy-src", gifFileRefresh);
        $("#mainCarousel .carousel__slide img").eq(pageIndex).attr("src", gifFileRefresh);

    }


    function initializeAdventCalendar(adventDay) {
        //console.log("launch initializeAdventCalendar");

        // Initialise Carousel
        const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
            Dots: false,
            slidesPerPage: 1,
            preload: 0,
            initialPage: adventDay-1, //advent day + 1
            on: {
                selectSlide: (carousel) => {
                    console.log("replay GIF in slide " + carousel.pageIndex);
                    replayGif(carousel.pageIndex);
                }
            }
        });

        const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
            Sync: {
                target: mainCarousel,
                friction: 0,
            },
            Dots: false,
            Navigation: false,
            center: true,
            infinite: false
        });

    }


});