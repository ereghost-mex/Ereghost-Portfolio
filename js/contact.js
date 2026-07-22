document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    if(name==="" || email==="" || message===""){

        alert("Please fill all required fields.");

        return;

    }

    alert("✅ Thank you! Your message has been submitted.");

    this.reset();

});