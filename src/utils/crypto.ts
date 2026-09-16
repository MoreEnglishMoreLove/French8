/**
 * Client-Side Verification Algorithm & Cryptographic Utility
 * Developed for "MORE ENGLISH MORE LOVE" - Teacher Jaidaa Saqr
 * 
 * 100% Standalone client-side mathematical hashing function.
 * Deterministic, offline-capable, runs without external databases.
 */

import { StudentSession, GeneratedCodeRecord } from '../types';

// Permanent Teacher Secret Salt - Embedded permanently in code
const CIPHER_SALT = "JAIDAA_SAQR_MORE_ENGLISH_MORE_LOVE_2026_K98#V3";

// Permanent Admin PIN
export const TEACHER_ADMIN_PIN = "b13a15m17";

// Teacher WhatsApp Number
export const TEACHER_WHATSAPP_NUMBER = "+963933036079";
export const TEACHER_WHATSAPP_RAW = "963933036079";

// Unambiguous Base-32 Alphabet (No 0/O, 1/I)
const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Normalizes Arabic and Latin strings so slight typo/spacing differences
 * (e.g., alef with hamza vs plain alef) still match predictably.
 */
export function normalizeStudentName(name: string): string {
  if (!name) return "";
  let clean = name.trim().toLowerCase();

  // Remove Arabic diacritics / Tashkeel
  clean = clean.replace(/[\u064B-\u065F\u0670]/g, "");

  // Normalize Alefs
  clean = clean.replace(/[إأآٱ]/g, "ا");

  // Normalize Taa Marbuta to Haa
  clean = clean.replace(/ة/g, "ه");

  // Normalize Alif Maqsura to Yaa
  clean = clean.replace(/ى/g, "ي");

  // Remove Tatweel (ـ)
  clean = clean.replace(/\u0640/g, "");

  // Collapse multiple whitespaces
  clean = clean.replace(/\s+/g, " ");

  return clean;
}

/**
 * Mathematical hashing algorithm:
 * Dual FNV-1a & Murmur-style polynomial rolling hash
 */
function computeDualHash(input: string, salt: string): { h1: number; h2: number } {
  const combined = `${salt}:${input}:${salt.split('').reverse().join('')}`;
  
  // Hash 1: FNV-1a 32-bit variant
  let h1 = 0x811c9dc5;
  for (let i = 0; i < combined.length; i++) {
    h1 ^= combined.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
  }
  h1 = (h1 ^ (h1 >>> 16)) >>> 0;

  // Hash 2: Polynomial rolling hash with prime 53 and secondary shift
  let h2 = 0x27d4eb2d;
  for (let i = 0; i < combined.length; i++) {
    const code = combined.charCodeAt(i);
    h2 = Math.imul(h2 ^ (code * (i + 13)), 0x5bd1e995);
    h2 = (h2 ^ (h2 >>> 15)) >>> 0;
  }
  h2 = (h2 ^ (h1 >>> 11)) >>> 0;

  return { h1, h2 };
}

/**
 * Generates the exclusive mathematical code in format: MEML-XXXX-XXXX
 */
export function generateActivationCode(rawStudentName: string): string {
  const normalized = normalizeStudentName(rawStudentName);
  if (!normalized) return "";

  const { h1, h2 } = computeDualHash(normalized, CIPHER_SALT);

  // Derive 4 characters from h1
  let block1 = "";
  let tempH1 = h1;
  for (let i = 0; i < 4; i++) {
    const idx = tempH1 % CODE_ALPHABET.length;
    block1 += CODE_ALPHABET[idx];
    tempH1 = Math.floor(tempH1 / CODE_ALPHABET.length) ^ 0x3a5c;
  }

  // Derive 4 characters from h2
  let block2 = "";
  let tempH2 = h2;
  for (let i = 0; i < 4; i++) {
    const idx = tempH2 % CODE_ALPHABET.length;
    block2 += CODE_ALPHABET[idx];
    tempH2 = Math.floor(tempH2 / CODE_ALPHABET.length) ^ 0x7e29;
  }

  return `MEML-${block1}-${block2}`;
}

/**
 * Validates a student's activation code against their full name.
 */
export function validateActivationCode(rawStudentName: string, inputCode: string): boolean {
  if (!rawStudentName || !inputCode) return false;

  const expectedCode = generateActivationCode(rawStudentName);
  if (!expectedCode) return false;

  // Normalize user code (trim, uppercase, standardize dashes)
  const cleanInput = inputCode.trim().toUpperCase().replace(/\s+/g, "");
  const cleanExpected = expectedCode.trim().toUpperCase();

  // Support inputs with or without the MEML prefix
  if (cleanInput === cleanExpected) return true;
  if (cleanInput === cleanExpected.replace(/-/g, "")) return true;

  // Also support entering only the 8 chars (e.g. XXXX-XXXX or XXXXXXXX)
  const eightCharsOnly = cleanExpected.replace("MEML-", "").replace(/-/g, "");
  const inputWithoutPrefix = cleanInput.replace("MEML-", "").replace("MEML", "").replace(/-/g, "");
  if (inputWithoutPrefix === eightCharsOnly) return true;

  return false;
}

/**
 * Generates or retrieves unique persistent device identifier
 */
export function getOrCreateDeviceId(): string {
  const STORAGE_KEY = 'meml_device_fingerprint';
  let deviceId = localStorage.getItem(STORAGE_KEY);
  if (!deviceId) {
    deviceId = 'DEV-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    try {
      localStorage.setItem(STORAGE_KEY, deviceId);
    } catch {
      // ignore
    }
  }
  return deviceId;
}

/**
 * Calculates 180 days (6 months) expiration in milliseconds
 */
export const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000; // 180 days

/**
 * Activate student session in LocalStorage
 */
export function activateStudentSession(studentName: string, activationCode: string): StudentSession {
  const now = Date.now();
  const session: StudentSession = {
    studentName: studentName.trim(),
    normalizedName: normalizeStudentName(studentName),
    activationCode: activationCode.trim().toUpperCase(),
    activatedAt: now,
    expiresAt: now + SIX_MONTHS_MS,
    deviceId: getOrCreateDeviceId(),
  };

  try {
    localStorage.setItem('meml_active_student_session', JSON.stringify(session));
  } catch (e) {
    console.error('Could not save session in LocalStorage', e);
  }

  return session;
}

/**
 * Get active student session from LocalStorage
 */
export function getActiveStudentSession(): StudentSession | null {
  try {
    const data = localStorage.getItem('meml_active_student_session');
    if (!data) return null;
    const session: StudentSession = JSON.parse(data);

    // Validate that the session code still mathematically matches
    if (!validateActivationCode(session.studentName, session.activationCode)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Checks if a session has expired (after 180 days)
 */
export function isSessionExpired(session: StudentSession | null): boolean {
  if (!session) return true;
  return Date.now() >= session.expiresAt;
}

/**
 * Clears active session (Logout)
 */
export function clearStudentSession(): void {
  try {
    localStorage.removeItem('meml_active_student_session');
  } catch (e) {
    console.error(e);
  }
}

/**
 * Get saved teacher generated codes history from LocalStorage
 */
export function getTeacherGeneratedCodes(): GeneratedCodeRecord[] {
  try {
    const data = localStorage.getItem('meml_teacher_generated_codes');
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Save new code in teacher history
 */
export function saveTeacherGeneratedCode(studentName: string, code: string, notes?: string): GeneratedCodeRecord {
  const history = getTeacherGeneratedCodes();
  const newRecord: GeneratedCodeRecord = {
    id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    studentName: studentName.trim(),
    code,
    createdAt: Date.now(),
    notes,
  };

  // Avoid duplicate identical name+code at the top
  const filtered = history.filter(h => !(normalizeStudentName(h.studentName) === normalizeStudentName(studentName) && h.code === code));
  filtered.unshift(newRecord);

  try {
    localStorage.setItem('meml_teacher_generated_codes', JSON.stringify(filtered.slice(0, 500)));
  } catch (e) {
    console.error(e);
  }

  return newRecord;
}

/**
 * Delete a code record from teacher history
 */
export function deleteTeacherCodeRecord(id: string): void {
  const history = getTeacherGeneratedCodes().filter(h => h.id !== id);
  try {
    localStorage.setItem('meml_teacher_generated_codes', JSON.stringify(history));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Formats milliseconds remaining into Days, Hours, Minutes, Seconds
 */
export function formatRemainingTime(expiresAt: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formattedString: string;
} {
  const diff = expiresAt - Date.now();
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      formattedString: 'انتهت صلاحية الاشتراك (180 يوماً)',
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    formattedString: `${days} يوم و ${hours} ساعة و ${minutes} دقيقة`,
  };
}

/**
 * Build WhatsApp click-to-chat URL for requesting code from teacher
 */
export function getRequestCodeWhatsAppUrl(studentName: string = ""): string {
  const text = studentName.trim()
    ? `مرحباً أستاذة جيداء صقر، أود الحصول على كود التفعيل لتطبيق MORE ENGLISH MORE LOVE لفتح المنهاج. اسمي الكامل هو: ${studentName.trim()}`
    : `مرحباً أستاذة جيداء صقر، أود الحصول على كود التفعيل لتطبيق MORE ENGLISH MORE LOVE لفتح المنهاج التعليمي والدروس التفاعلية وأوراق العمل. شكراً جزيلاً!`;

  return `https://wa.me/${TEACHER_WHATSAPP_RAW}?text=${encodeURIComponent(text)}`;
}

/**
 * Build WhatsApp URL for teacher sending generated code to student
 */
export function getSendCodeWhatsAppUrl(studentName: string, code: string): string {
  const message = `أهلاً بك يا ${studentName.trim()} 🌟\nيسر المعلمة جيداء صقر إرسال كود التفعيل الخاص بك لتطبيق:\n✨ MORE ENGLISH MORE LOVE ✨\n\n📌 كود التفعيل الحصري الخاص بك:\n👉 ${code} 👈\n\n🗓️ صلاحية الكود: 6 أشهر كاملة (180 يوماً)\n💡 للبدء: افتح التطبيق، واكتب اسمك كما هو، ثم الصق كود التفعيل واضغط "تفعيل الحساب والدخول للمنهاج".\n\nنتمنى لك دوام التميز والنجاح والتفوق! ✨`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
