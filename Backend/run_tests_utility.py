import subprocess
import os

def run_tests():
    cmd = [os.path.join('venv', 'Scripts', 'python.exe'), 'manage.py', 'test', 'tickets', '-v', '2']
    try:
        with open('test_results.txt', 'w') as f:
            result = subprocess.run(cmd, capture_output=True, text=True)
            f.write("STDOUT:\n")
            f.write(result.stdout)
            f.write("\nSTDERR:\n")
            f.write(result.stderr)
        print("Tests finished, output written to test_results.txt")
    except Exception as e:
        with open('test_results.txt', 'a') as f:
            f.write(f"\nError running tests: {str(e)}")

if __name__ == "__main__":
    run_tests()
