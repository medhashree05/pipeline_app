pipeline {
    agent any

    environment {
        IMAGE_NAME = "medhashree/2023bcs0042_42"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/medhashree_05/cloud-cicd-docker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                usernameVariable: 'USER',
                passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

    }
}