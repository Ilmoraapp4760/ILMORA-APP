
// ===== Firebase setup for Isal-e-Sawab orders =====
window.__fsReady=false;
function __initFirebase(){
  if(typeof firebase==='undefined'){
    console.warn('Firebase SDK did not load (no internet / blocked CDN). Orders will only save on this device.');
    return;
  }
  try{
    
    firebase.initializeApp(firebaseConfig);
    var __db=firebase.firestore();
    window.__auth=firebase.auth();
    window.__fsGetUserDoc=function(uid){return __db.collection('users').doc(uid).get().then(d=>d.exists?d.data():null)};
    window.__fsCreateUserDoc=function(uid,data){return __db.collection('users').doc(uid).set(Object.assign({},data,{createdAt:firebase.firestore.FieldValue.serverTimestamp()}))};
    window.__fsListTeachers=function(){return __db.collection('users').where('role','==','teacher').get().then(s=>{const out=[];s.forEach(d=>out.push(Object.assign({uid:d.id},d.data())));return out})};
    window.__fsListStudentsByTeacher=function(teacherUid){return __db.collection('users').where('role','==','student').where('teacherUid','==',teacherUid).get().then(s=>{const out=[];s.forEach(d=>out.push(Object.assign({uid:d.id},d.data())));return out})};
    window.__fsAddAssignment=function(data){return __db.collection('assignments').add(Object.assign({},data,{assignedAt:firebase.firestore.FieldValue.serverTimestamp(),status:'assigned'}))};
    window.__fsListAssignmentsByStudent=function(studentUid){return __db.collection('assignments').where('studentUid','==',studentUid).get().then(s=>{const out=[];s.forEach(d=>out.push(Object.assign({id:d.id},d.data())));return out})};
    window.__fsListAssignmentsByTeacher=function(teacherUid){return __db.collection('assignments').where('teacherUid','==',teacherUid).get().then(s=>{const out=[];s.forEach(d=>out.push(Object.assign({id:d.id},d.data())));return out})};
    window.__fsUpdateAssignmentStatus=function(id,status){return __db.collection('assignments').doc(id).update({status:status,updatedAt:firebase.firestore.FieldValue.serverTimestamp()})};
    window.__fsAdd=function(data){
      return __db.collection('sawab_orders').add(Object.assign({},data,{createdAt:firebase.firestore.FieldValue.serverTimestamp()}));
    };
    window.__fsSetPara=function(num,data){
      return __db.collection('para_status').doc(String(num)).set(Object.assign({},data,{updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),{merge:true}).catch(e=>console.warn('Para sync failed',e));
    };
    window.__fsLoadParaStatus=function(){
      return __db.collection('para_status').get().then(snap=>{const out={};snap.forEach(doc=>{out[doc.id]=doc.data()});return out}).catch(e=>{console.warn('Could not load para_status',e);return null});
    };
    window.__fsReady=true;
    console.log('Firebase connected ✓');
  }catch(e){console.warn('Firebase init failed — orders will only save on this device.',e)}
}
// Try immediately, and also retry a moment later in case scripts were still loading
__initFirebase();
window.addEventListener('load',function(){ if(!window.__fsReady) __initFirebase(); });
