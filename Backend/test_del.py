import os

db_path = 'data/db.sqlite3'
if os.path.exists(db_path):
    try:
        os.remove(db_path)
        with open('DELETED_SUCCESSFULLY', 'w') as f:
            f.write('yes')
    except Exception as e:
        with open('DELETE_FAILED', 'w') as f:
            f.write(str(e))
else:
    with open('DELETED_SUCCESSFULLY', 'w') as f:
        f.write('already_gone')
