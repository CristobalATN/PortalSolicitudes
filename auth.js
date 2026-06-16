import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut as firebaseSignOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

export function verifySession(requiredRole = null) {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href = 'index.html';
                return;
            }
            try {
                const userSnap = await getDoc(doc(db, "usuarios", user.uid));
                if (!userSnap.exists()) { await logout(); return; }

                const userData = userSnap.data();
                const sessionData = {
                    uid: user.uid,
                    email: user.email,
                    rol: userData.rol,
                    nombre: userData.nombre || user.email,
                    rut: userData.rut || '',
                    numSocio: userData.numSocio || ''
                };

                if (requiredRole && userData.rol !== requiredRole) {
                    // Redirigir al panel correcto
                    if (userData.rol === 'socio') window.location.href = 'socio.html';
                    else window.location.href = 'admin.html';
                    return;
                }

                window.currentUserData = sessionData;
                document.dispatchEvent(new CustomEvent('sessionReady', { detail: sessionData }));
                resolve(sessionData);
                unsubscribe();
            } catch (error) {
                reject(error);
            }
        });
    });
}

export async function logout() {
    await firebaseSignOut(auth);
    window.location.href = 'index.html';
}
