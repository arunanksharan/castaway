import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

const database = SQLite.openDatabase('drafts.db');

export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS drafts (
                                id TEXT PRIMARY KEY NOT NULL,
                                content TEXT NOT NULL,
                                created_at TEXT NOT NULL DEFAULT (datetime('now'))
                        )`,
        [],
        () => {
          console.log('Table created successfully');
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true; // Fix: Rollback transaction
        }
      );
    });
  });
  return promise;
}

export function fetchDrafts() {
  const promise = new Promise<
    { id: string; content: string; created_at: string }[]
  >((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM drafts`,
        [],
        (_, result) => {
          console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          console.log('Result fetched successfully');
          console.log(result.rows);
          console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
          const drafts: { id: string; content: string; created_at: string }[] =
            [];
          for (let i = 0; i < result.rows.length; i++) {
            drafts.push(result.rows.item(i));
          }
          console.log('ffffffffffffffffffffffffffffffffffffffffffffffff');
          console.log('Drafts fetched successfully');
          console.log(drafts);
          console.log('ffffffffffffffffffffffffffffffffffffffffffffffff');
          resolve(drafts);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true; // Fix: Rollback transaction
        }
      );
    });
  });
  return promise;
}
export function insertDraft(content: string) {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    const id = `${uuid.v4()}`;
    const created_at = new Date().toISOString(); // ISO string format includes timezone information.

    console.log('Inserting draft: {id, content, created_at}:', {
      id,
      content,
      created_at,
    });

    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO drafts (id, content, created_at) VALUES (?, ?, ?)`,
        [id, content, created_at],
        (_, result) => {
          console.log('Draft inserted successfully');
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true; // Fix: Rollback transaction
        }
      );
    });
  });
  return promise;
}

export function deleteDraft(id: string) {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM drafts WHERE id = ?`,
        [id],
        (_, result) => {
          console.log('Draft deleted successfully');
          resolve(result);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true; // Fix: Rollback transaction
        }
      );
    });
  });
  return promise;
}
