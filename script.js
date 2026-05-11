const exams = [
    { id: 1, title: "Expert Systems", arabicTitle: "نظم خبيرة", date: "2026-05-09T13:00:00", day: "السبت", time: "من ١ إلى ٣", halls: "211-213-215-314", color: "blue" },
    { id: 2, title: "Software Engineering", arabicTitle: "هندسة البرمجيات", date: "2026-05-13T13:00:00", day: "الأربعاء", time: "من ١ إلى ٣", halls: "211-213-215-112, 201", color: "green" },
    { id: 3, title: "Natural Language Processing (NLP)", arabicTitle: "معالجة اللغات الطبيعية (قواعد البيانات الحية)", date: "2026-05-17T13:00:00", day: "الأحد", time: "من ١ إلى ٣", halls: "215-213-211-202, 416-418-422", color: "purple" },
    { id: 4, title: "Computer Networks", arabicTitle: "شبكات الحاسب", date: "2026-05-23T13:00:00", day: "السبت", time: "من ١ إلى ٣", halls: "201-202-211-213-215", color: "orange" },
    { id: 5, title: "Compiler Theory", arabicTitle: "نظرية المترجمات", date: "2026-06-02T13:00:00", day: "الثلاثاء", time: "من ١ إلى ٣", halls: "211-213-215-115", color: "pink" },
    { id: 6, title: "Computer Graphics", arabicTitle: "الرسم بالحاسب", date: "2026-06-13T13:00:00", day: "السبت", time: "من ١ إلى ٣", halls: "416-418-422-210", color: "blue" }
];

const colorClasses = {
    blue: "border-blue-500 bg-blue-50/80 dark:bg-blue-950/30",
    green: "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30",
    purple: "border-purple-500 bg-purple-50/80 dark:bg-purple-950/30",
    orange: "border-orange-500 bg-orange-50/80 dark:bg-orange-950/30",
    pink: "border-rose-500 bg-rose-50/80 dark:bg-rose-950/30"
};

const badgeClasses = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    pink: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
};

function renderExams() {
    const container = document.getElementById('examContainer');
    const now = new Date();
    let completedCount = 0;
    let nextExam = null;

    container.innerHTML = '';

    exams.forEach((exam, index) => {
        const examDate = new Date(exam.date);
        const isPast = now > examDate;
        if (isPast) completedCount++;
        
        if (!nextExam && !isPast) {
            nextExam = exam;
        }

        const isFirst = index === 0;
        const isLast = index === exams.length - 1;

        const card = document.createElement('div');
        card.className = `exam-card relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border-r-8 ${colorClasses[exam.color]} ${isPast ? 'opacity-60 grayscale-[0.5]' : ''} mb-4`;
        
        card.innerHTML = `
            <div class="flex flex-wrap justify-between items-start gap-2 mb-4">
                <div>
                    ${isFirst ? '<span class="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md mb-2 inline-block">البداية</span>' : ''}
                    ${isLast ? '<span class="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md mb-2 inline-block">الختام</span>' : ''}
                    <h3 class="text-xl font-black text-slate-800 dark:text-white leading-tight">${exam.title}</h3>
                    <p class="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">${exam.arabicTitle}</p>
                </div>
                <div class="text-left">
                    <span class="px-3 py-1 rounded-full text-sm font-bold ${badgeClasses[exam.color]}">
                        ${new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long' }).format(examDate)}
                    </span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-rounded text-lg">calendar_month</span>
                    <span class="font-semibold">${exam.day}</span>
                </div>
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-rounded text-lg">schedule</span>
                    <span>${exam.time}</span>
                </div>
                <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400 md:col-span-2">
                    <span class="material-symbols-rounded text-lg">location_on</span>
                    <span><strong>القاعات:</strong> ${exam.halls}</span>
                </div>
            </div>

            ${!isPast ? `
                <div class="card-timer pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div class="flex items-center gap-3">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">متبقي:</span>
                        <div class="flex gap-2 dir-ltr text-center">
                            <div class="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg min-w-[45px]">
                                <span class="block text-sm font-bold text-slate-700 dark:text-slate-200" data-timer-days="${exam.id}">0</span>
                                <span class="text-[9px] text-slate-500">يوم</span>
                            </div>
                            <div class="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg min-w-[45px]">
                                <span class="block text-sm font-bold text-slate-700 dark:text-slate-200" data-timer-hours="${exam.id}">0</span>
                                <span class="text-[9px] text-slate-500">س</span>
                            </div>
                            <div class="bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg min-w-[45px]">
                                <span class="block text-sm font-bold text-slate-700 dark:text-slate-200" data-timer-mins="${exam.id}">0</span>
                                <span class="text-[9px] text-slate-500">د</span>
                            </div>
                        </div>
                    </div>
                </div>
            ` : `
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="bg-green-500/10 border-2 border-green-500 text-green-600 font-black px-6 py-2 rounded-lg rotate-12 text-2xl opacity-40">
                        انتهى
                    </div>
                </div>
            `}
        `;
        container.appendChild(card);
    });

    // Update Progress
    const progress = (completedCount / exams.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressPercent').innerText = `${Math.round(progress)}%`;

    updateCountdown(nextExam);
}

function updateCountdown(nextExam) {
    const countdownBox = document.getElementById('countdownBox');
    if (!nextExam) {
        countdownBox.classList.add('hidden');
    } else {
        countdownBox.classList.remove('hidden');
        document.getElementById('nextSubjectName').innerHTML = `
            <span class="block">${nextExam.title}</span>
            <span class="text-xs opacity-80 mt-1 block">${nextExam.arabicTitle}</span>
        `;
    }

    const updateAllTimers = () => {
        const now = new Date().getTime();

        // Update Main Countdown if exists
        if (nextExam) {
            const distance = new Date(nextExam.date).getTime() - now;
            if (distance > 0) {
                document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            }
        }

        // Update Individual Card Timers
        exams.forEach(exam => {
            const distance = new Date(exam.date).getTime() - now;
            const daysEl = document.querySelector(`[data-timer-days="${exam.id}"]`);
            const hoursEl = document.querySelector(`[data-timer-hours="${exam.id}"]`);
            const minsEl = document.querySelector(`[data-timer-mins="${exam.id}"]`);

            if (distance > 0 && daysEl) {
                daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
                hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minsEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            } else if (distance <= 0 && daysEl) {
                // If an exam just finished, re-render to show "Completed"
                renderExams();
            }
        });
    };

    updateAllTimers();
    setInterval(updateAllTimers, 60000); // Update every minute for performance
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeIcon.innerText = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.innerText = 'dark_mode';
    }
}
initTheme();

// Real Global Heart Counter Logic (Starting from 0)
const heartBtn = document.getElementById('heartBtn');
const heartCountEl = document.getElementById('heartCount');

// Unique API URL for your project
const API_URL = 'https://api.counterapi.dev/v1/mahmoud_exam_2026_final/hearts';

async function initHeartCounter() {
    const heartCountEl = document.getElementById('heartCount');
    if (!heartCountEl) return;

    // 1. Load from cache immediately
    const cachedCount = localStorage.getItem('heartCount');
    if (cachedCount) {
        try {
            heartCountEl.innerText = parseInt(cachedCount).toLocaleString('ar-EG');
        } catch (e) {
            heartCountEl.innerText = cachedCount;
        }
    } else {
        heartCountEl.innerText = "٠"; // Default starting point
    }

    // 2. Check if user already clicked
    if (localStorage.getItem('heartClicked') === 'true') {
        const icon = heartBtn?.querySelector('.material-symbols-rounded');
        if (icon) {
            icon.style.fontVariationSettings = "'FILL' 1";
            icon.classList.add('text-red-500');
        }
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();
        const data = await response.json();
        
        // Ensure count is a number
        const count = Number(data.count) || 0;
        
        // Update UI and Cache
        try {
            heartCountEl.innerText = count.toLocaleString('ar-EG');
        } catch (e) {
            heartCountEl.innerText = count;
        }
        localStorage.setItem('heartCount', count);
    } catch (e) {
        console.error("Heart Counter Load Error:", e);
        // If API fails and no cache, keep it as "0"
        if (!cachedCount) heartCountEl.innerText = "٠";
    }
}

async function incrementHeart() {
    if(heartBtn.disabled) return;
    
    // 1. Immediate Visual Feedback
    const icon = heartBtn.querySelector('.material-symbols-rounded');
    icon.style.fontVariationSettings = "'FILL' 1";
    icon.classList.add('text-red-500', 'scale-125');
    setTimeout(() => icon.classList.remove('scale-125'), 200);

    // Create pop effect
    const pop = document.createElement('span');
    pop.innerText = 'favorite';
    pop.className = 'heart-pop absolute material-symbols-rounded text-red-500';
    pop.style.fontVariationSettings = "'FILL' 1";
    heartBtn.appendChild(pop);
    setTimeout(() => pop.remove(), 600);
    
    // Disable button briefly
    heartBtn.disabled = true;
    heartBtn.classList.add('opacity-80');

    try {
        // 2. Real API Call
        const response = await fetch(`${API_URL}/up`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        const newCount = data.count || 0;
        
        // 3. Update with real data and save state
        heartCountEl.innerText = newCount.toLocaleString('ar-EG');
        localStorage.setItem('heartCount', newCount);
        localStorage.setItem('heartClicked', 'true');
        
    } catch (e) {
        console.error("Counter error", e);
        // Fallback local increment
        const currentText = heartCountEl.innerText;
        const current = parseInt(currentText.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))) || 0;
        const fallbackCount = current + 1;
        heartCountEl.innerText = fallbackCount.toLocaleString('ar-EG');
        localStorage.setItem('heartCount', fallbackCount);
    } finally {
        setTimeout(() => {
            heartBtn.disabled = false;
            heartBtn.classList.remove('opacity-80');
        }, 1000);
    }
}

heartBtn.addEventListener('click', incrementHeart);

// Loader Functionality
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    }
}

// Start
document.addEventListener('DOMContentLoaded', async () => {
    renderExams();
    initHeartCounter();
    
    try {
        // Wait for all fonts to be fully loaded
        await document.fonts.ready;
    } catch (e) {
        console.log("Font loading failed, showing page anyway");
    }
    
    // Hide loader after fonts are ready
    setTimeout(hideLoader, 500);
});
