import { db } from './firebaseConfig';
import { ref, get, child, remove, update } from 'firebase/database';

const fetchUsersFromFolder = async (folder) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, folder));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

export const fetchUsers = async () => {
  const clubManagers = await fetchUsersFromFolder('clubManager');
  const securityPersonnel = await fetchUsersFromFolder('securityPersonnel');
  const securityAdmins = await fetchUsersFromFolder('securityAdmin');

  const addRole = (users, role) => {
    const roleMap = {
      clubManager: 'Club Manager',
      securityPersonnel: 'Security Personnel',
      securityAdmin: 'Security Admin'
    };
    return Object.keys(users).reduce((acc, key) => {
      acc[key] = { ...users[key], role: roleMap[role] };
      return acc;
    }, {});
  };

  return {
    ...addRole(clubManagers, 'clubManager'),
    ...addRole(securityPersonnel, 'securityPersonnel'),
    ...addRole(securityAdmins, 'securityAdmin')
  };
};

export const deleteUserFromDatabase = async (email, role) => {
  const roleMap = {
    'Club Manager': 'clubManager',
    'Security Personnel': 'securityPersonnel',
    'Security Admin': 'securityAdmin'
  };
  const userRef = ref(db, `${roleMap[role]}/${email.replace('.', ',')}`);
  await remove(userRef);
};

export const updateUser = async (email, updatedData, role) => {
  const roleMap = {
    'Club Manager': 'clubManager',
    'Security Personnel': 'securityPersonnel',
    'Security Admin': 'securityAdmin'
  };
  const userRef = ref(db, `${roleMap[role]}/${email.replace('.', ',')}`);
  await update(userRef, updatedData);
};