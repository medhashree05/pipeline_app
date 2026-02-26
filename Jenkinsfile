pipeline {
    agent any

    environment {
        IMAGE_NAME = "medhashree05/frontend:v1"
        CONTAINER_NAME = "frontend-test"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/medhashree05/pipeline_app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Run Container (Test)') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true
                docker run -d -p 8081:80 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }

        stage('Test Application') {
            steps {
                sh '''
                sleep 5
                curl http://localhost:8081
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f $CONTAINER_NAME || true'
        }
    }
}