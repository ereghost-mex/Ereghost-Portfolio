const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const params = {

        from_name: document.getElementById("name").value,

        from_email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value

    };

    emailjs.send(

        "service_1k41afv",

        "template_7u8ks7r",

        params

    )

    .then(function(){

        alert("✅ Message sent successfully!");

        form.reset();

    })

    .catch(function(error){

        console.log(error);

        alert("❌ Failed to send message.");

    });

});
