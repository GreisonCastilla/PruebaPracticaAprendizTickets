import os
import shutil
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'data', 'db.sqlite3')

def reset_db():
    print(f"Target database path: {DB_PATH}")
    
    # 1. Delete database
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
            print("Successfully deleted existing database.")
        except Exception as e:
            print(f"Error deleting database: {e}")
            # Try to force delete if it's a directory (unlikely but safe)
            if os.path.isdir(DB_PATH):
                shutil.rmtree(DB_PATH)
    else:
        print("Database file not found, skipping deletion.")

    # 2. Run migrations
    print("Running migrations...")
    try:
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        print("Migrations completed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error running migrations: {e}")
        return False

    # 3. Run seed data
    print("Running seed script...")
    try:
        subprocess.run([sys.executable, 'seed_data.py'], check=True)
        print("Seed data applied successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error running seed script: {e}")
        return False

    return True

if __name__ == '__main__':
    if reset_db():
        print("Database reset and seeding completed!")
    else:
        print("Database reset failed.")
        sys.exit(1)
