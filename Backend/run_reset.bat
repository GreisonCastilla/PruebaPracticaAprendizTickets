@echo off
echo Resetting database... > reset_log.txt
python reset_db.py >> reset_log.txt 2>&1
echo Done. >> reset_log.txt
