let menuline1=document.getElementById("menuline1");
        let menuline2=document.getElementById("menuline2");
        let menuline3=document.getElementById("menuline3");
        let menuicon=document.getElementById("menuicon");
        menuline1.style.transform="none";
        let sidebar=document.getElementById("sidebar");
        function toggleMenu(){
            if (menuline1.style.transform=="none"){
                menuline1.style.position="relative";
                menuline1.style.top="7px";
                menuline1.style.transform="rotate(45deg)";
                menuline2.style.transform="rotateY(90deg)";
                menuline3.style.transform="rotate(-45deg)";
                menuline3.style.position="relative";
                menuline3.style.bottom="7px";
                sidebar.style.width="50vw";

            }
            else
            {
                menuline1.style.transform="none";
                menuline2.style.transform="none";
                menuline3.style.transform="none";
                menuline1.style.position="sticky";
                menuline3.style.position="sticky";
                sidebar.style.width="0vw";
            }
        }