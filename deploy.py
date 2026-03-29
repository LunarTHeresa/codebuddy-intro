#!/usr/bin/env python3
import paramiko
from scp import SCPClient
import sys

def create_ssh_client(server, port, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(server, port, user, password)
    return client

def deploy_website():
    server_ip = "43.159.56.7"
    port = 22
    username = "ubuntu"
    password = "2720257849@QQ.com"
    remote_dir = "/var/www/html"
    
    try:
        ssh = create_ssh_client(server_ip, port, username, password)
        scp = SCPClient(ssh.get_transport())
        
        # Ensure remote directory exists
        stdin, stdout, stderr = ssh.exec_command(f"sudo mkdir -p {remote_dir} && sudo chown {username}:{username} {remote_dir}")
        
        # Copy files individually
        files_to_upload = ['index.html', 'styles.css', 'script.js']
        for file in files_to_upload:
            print(f"Uploading {file}...")
            scp.put(file, remote_path=f'{remote_dir}/{file}')
        
        # Setup nginx
        stdin, stdout, stderr = ssh.exec_command("sudo systemctl restart nginx")
        
        print("Deployment successful! Website available at http://43.159.56.7")
        
        scp.close()
        ssh.close()
        
    except Exception as e:
        print(f"Deployment failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    deploy_website()