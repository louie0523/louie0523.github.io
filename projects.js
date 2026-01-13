// ===== 3D 회전 캐러셀 =====
let angle = 0;
const cards = document.querySelectorAll(".card");
const carousel = document.getElementById("carousel");

const total = cards.length;
const angleStep = 360 / total;

function positionCards() {
    cards.forEach((card, i) => {
        const theta = angleStep * i + angle;
        card.style.transform = `
            rotateY(${theta}deg) 
            translateZ(380px)
        `;
    });
}
positionCards();

// 마우스 드래그
let startX = 0;

carousel.addEventListener("mousedown", e => {
    startX = e.clientX;
});

carousel.addEventListener("mousemove", e => {
    if (e.buttons === 1) {
        const delta = e.clientX - startX;
        angle += delta * 0.4;
        startX = e.clientX;
        positionCards();
    }
});


// ===== 모달 =====
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

const projectData = {
    1: {
        img: "project1.jpg",
        title: "프로젝트 1",
        desc: "프로젝트 1의 상세 설명 내용입니다."
    },
    2: {
        img: "project2.jpg",
        title: "프로젝트 2",
        desc: "프로젝트 2의 상세 내용입니다."
    },
    3: {
        img: "project3.jpg",
        title: "프로젝트 3",
        desc: "프로젝트 3 개발 비하."
    },
    4: {
        img: "project4.jpg",
        title: "프로젝트 4",
        desc: "프로젝트 4의 작업 과정."
    }
};

cards.forEach(card => {
    card.addEventListener("click", () => {
        const id = card.dataset.id;
        const d = projectData[id];

        modalImg.src = d.img;
        modalTitle.textContent = d.title;
        modalDesc.textContent = d.desc;

        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
