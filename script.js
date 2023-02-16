const testimonalDIv = document.querySelector(".Testimonials");
const animationElementList = document.querySelector(".TestimonialsCards");
let TestimonalCountControl = 1;
let testimonalSpeed = 7000;
let preventTestimonals = false;
let testimonalPosition = 0;
let currentSlide = 3;
let TransitionCompleted = false;
const classNameChnageingFunction = (toward, testimonalCards) => {
    let childNode = testimonalCards?.children;

    let firstChildNode = childNode[0].className;
    let lastChildNode = childNode[childNode.length - 1].className;
    let data = [];

    if (toward == "right") {
        if (currentSlide - 1 == 0) {
            currentSlide = childNode.length;
        } else {
            currentSlide -= 1;
        }
        for (var i = 0; i < childNode.length; i++) {
            if (i == childNode.length - 1) {
                childNode[i].className = firstChildNode;
                TransitionCompleted = true;
            } else {
                childNode[i].className = childNode[i + 1].className;
            }
        }
    }

    if (toward == "left") {
        if (currentSlide == childNode.length) {
            currentSlide = 1;
        } else {
            currentSlide += 1;
        }
        for (var i = childNode.length - 1; i >= 0; i--) {
            if (i == 0) {
                childNode[i].className = lastChildNode;
                TransitionCompleted = true;
            } else {
                childNode[i].className = childNode[i - 1].className;
            }
        }
    }
};
let value2 = 0;
const testimonalDiv = (directioni, testimonalCards) => {
    classNameChnageingFunction(directioni, testimonalCards);
    // //console.log(value2)
    const interval8 = setTimeout(() => {
        if (value2 > 1) {
            clearTimeout(interval8);
            value2 -= 1;
            testimonalDiv(directioni, testimonalCards);
        } else {
            clearTimeout(interval8);
            return;
        }
    }, 500);
};

const onClickInTestimonals = () => {
    const testimonalCards = document.querySelector(".TestimonialsCards");
    const childnode = testimonalCards.children;
    let childClassname = [];

    for (var i = 0; i < childnode.length; i++) {
        //console.log(childnode)
        childClassname.push(childnode[i].className);
        childnode[i].addEventListener("click", (s) => {
            let selectedDivNo = "";
            let clickedElement = "";
            childClassname.map((o) => {
                if (o == s.target.className) {
                    clickedElement = s.target.className;
                } else if (o == s.target.parentElement.className) {
                    clickedElement = s.target.parentElement.className;
                }
            });

            for (var i = 1; i <= childnode.length; i++) {
                if (childnode[i - 1].className == clickedElement) {
                    selectedDivNo = i;
                }
            }

            //console.log("currentSlide",currentSlide,"selectedDiv",selectedDivNo, s.pageX , s.view.innerWidth)

            if (s.pageX - s.view.innerWidth / 2 > 0) {
                if (selectedDivNo > currentSlide) {
                    value2 = selectedDivNo - currentSlide;
                    //console.log( value2 , "left")
                    testimonalDiv("left", testimonalCards);
                } else if (selectedDivNo < currentSlide) {
                    value2 = selectedDivNo + (childnode.length - currentSlide);

                    //console.log( value2  ,"right")
                    testimonalDiv("left", testimonalCards);
                }
            } else if (s.pageX - s.view.innerWidth / 2 < 0) {
                if (selectedDivNo < currentSlide) {
                    value2 = currentSlide - selectedDivNo;
                    //console.log( value2 , "left")
                    testimonalDiv("right", testimonalCards);
                } else if (selectedDivNo > currentSlide) {
                    value2 = selectedDivNo + (currentSlide - childnode.length);

                    //console.log( value2  ,"right")
                    testimonalDiv("right", testimonalCards);
                }
            }
        });
    }
};

onClickInTestimonals();

const testimonial = () => {
    const testimonalCards = document.querySelector(".TestimonialsCards");
    setInterval(() => {
        if (!preventTestimonals) {
            classNameChnageingFunction("left", testimonalCards);
        }
    }, testimonalSpeed);
};

testimonial();

const testimonalLeft = () => {
    const testimonalCards = document.querySelector(".TestimonialsCards");

    classNameChnageingFunction("right", testimonalCards);
};

const testimonalRight = () => {
    const testimonalCards = document.querySelector(".TestimonialsCards");

    classNameChnageingFunction("left", testimonalCards);
};

let pageX = 0;

let childnodes2 = animationElementList.children;

let data = [];
for (var s of childnodes2) {
    let leftarrow = document.querySelector(".leftArrowDiv");
    let rightarrow = document.querySelector(".rightArrowDiv");
    let parent = s.parentElement;
    let data = [parent, leftarrow, rightarrow];

    data.map((parents) => {
        parents.addEventListener("mousemove", (o) => {
            preventTestimonals = true;
        });
        parents.addEventListener("mouseleave", (o) => {
            preventTestimonals = false;
            pageX = 0;
        });
        parents.addEventListener("mouseup", (o) => {
            pageX = 0;
        });
    });
    s.addEventListener("mousedown", (o) => {
        preventTestimonals = true;

        pageX = o.pageX + 400;
    });
}
