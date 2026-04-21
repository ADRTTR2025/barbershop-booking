document.addEventListener("DOMContentLoaded", function () {

const  form = document.getElementById("bookingform");
const message = document.getElementById("message");
const list = document.getElementById("bookinglist");

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function save() {
    localStorage.setItem("bookings", JSON.stringify(bookings));

}

function togglemenu() {
    const sidebar = document.getElementById("sidebar");

    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px";

    } else {
        sidebar.style.right = "0px";
    }
}
function render() {
    list.innerHTML = "";

    bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    let currentdate = "";

    bookings.forEach((b, index) => {
        if(b.date !== currentdate) {
            currentdate = b.date;

            const title = document.createElement("h3");
            title.innerText = `📅 ${b.date}`;
            list.appendChild(title);

        }

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <p>👤 ${b.name}</p>
        <p>📞 ${b.phone}</p>
        <p>✂️ ${b.service}</p>
        <p>⏰ ${b.time}</p>
        <button onclick="removebooking(${index})">حذف</button>
        `;

        list.appendChild(card);


    });

}

form.addEventListener("submit", function(e) {
    e.preventDefault();

const name = form.elements.name.value;
const phone = form.elements.phone.value;
const service = form.elements.service.value;
const time = form.elements.time.value;
const date = form.elements.date.value;

    if (!name || !phone || !time || !date) {
        message.innerText = "عبي كل الحقول 👀";
        message.style.display = "block";
        return;
    }

    if (bookings.some(b => b.date === date && b.time === time)) {
        message.innerText = "هذا الوقت محجوز ⛔";
        message.style.display = "block";

setTimeout(() => {
    message.style.display = "none";
}, 2500);
        return;
    }

    bookings.push({ name, phone, service, time, date });
    save();
    render();

    message.innerText = "تم الحجز بنجاح ✅";
    message.style.display = "block";

    setTimeout(() => {
        message.style.display = "none";
    }, 2500);

    form.reset();
});


    

window.addEventListener("load", () => {
    render();
});


});
