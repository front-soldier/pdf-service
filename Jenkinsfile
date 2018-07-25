pipeline {
  agent any
  stages {
    stage('Dependencies') {
      steps {
        sh 'cp src/config.example.ts src/config.ts'
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        sh 'gcloud container clusters get-credentials pdfservice'
        sh 'gcloud container builds submit --tag gcr.io/wiser-mainframe/pdfservice .'
        sh 'kubectl set image deployment pdfservice pdfservice=gcr.io/wiser-mainframe/pdfservice:latest'
        sh 'kubectl set image deployment pdfservice pdfservice=gcr.io/wiser-mainframe/pdfservice'
      }
    }
  }
}
