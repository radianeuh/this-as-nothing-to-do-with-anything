const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const boutton_start = document.getElementById('boutton_start');
const boutton_reset = document.getElementById('boutton_reset');
const boutton_stop = document.getElementById('boutton_stop');

const pi_result = document.getElementById('pi_result');
const nombre_de_point_total = document.getElementById('nombre_de_point_total');
const nombre_de_point_dans_le_cercle = document.getElementById('nombre_de_point_dans_le_cercle');
const nombre_de_point_en_dehors_du_cercle = document.getElementById('nombre_de_point_en_dehors_du_cercle');

let point_en_tout = 0;
let dans_le_cercle = 0;
let en_dehors_du_cercle = 0;
let interval;

function cercle() {

    ctx.beginPath();
    ctx.arc(200, 200, 200, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.fill();
    ctx.stroke();

}   

function les_points(x, y, dedans) {

    ctx.fillStyle = dedans ? 'green' : 'red';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();

}

function faire_les_points() {

    let points_dans_le_cercle = 0;
    let points_en_dehors_du_cercle = 0;
    const points = Math.floor(Math.random() * 100) + 1;

    for (let i = 0; i < points; i++) {
        const x = Math.random();
        const y = Math.random();

        const distance_du_centre = Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2);
        const dans_le_cercle = distance_du_centre <= 0.5;

        if (dans_le_cercle) {
            points_dans_le_cercle++;
            les_points(x * 400, y * 400, true);
        } else {
            points_en_dehors_du_cercle++;
            les_points(x * 400, y * 400, false);
        }
    }

    point_en_tout += points;
    dans_le_cercle += points_dans_le_cercle;
    en_dehors_du_cercle += points_en_dehors_du_cercle;

    const estimation_de_pi = (() => {
        const ratio = dans_le_cercle / point_en_tout;
        const multiplier = 4;
        return ratio * multiplier;
    })();

    pi_result.textContent = `Estimation de Pi : ${estimation_de_pi}`;
    nombre_de_point_total.textContent = `Point total : ${point_en_tout}`;
    nombre_de_point_dans_le_cercle.textContent = `Point dans le cercle : ${dans_le_cercle}`;
    nombre_de_point_en_dehors_du_cercle.textContent = `Point en dehors du cercle : ${en_dehors_du_cercle}`;

}

boutton_start.addEventListener('click', () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cercle();

    point_en_tout = 0;
    dans_le_cercle = 0;
    en_dehors_du_cercle = 0;

    if (!interval) {
        interval = setInterval(faire_les_points, 100);
    }

});

boutton_stop.addEventListener('click', () => {

    clearInterval(interval);
    interval = null;

});

boutton_reset.addEventListener('click', () => {

    clearInterval(interval);
    interval = null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cercle();

    point_en_tout = 0;
    dans_le_cercle = 0;
    en_dehors_du_cercle = 0;

    pi_result.textContent = 'Estimation de Pi : ';
    nombre_de_point_total.textContent = 'Point total : ';
    nombre_de_point_dans_le_cercle.textContent = 'Point dans le cercle : ';
    nombre_de_point_en_dehors_du_cercle.textContent = 'Point en dehors du cercle : ';
    
});

cercle();
