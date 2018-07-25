# PDF Service

In this microservice I use node, express and typescript. Also I use supertests to test my app.

![Service Diagram](/out/diagrams/pdfservice/PDF%20Service.png)

+ Request to convert doc and docx files in to pdf
**POST**&nbsp;&nbsp;`/convert`

    + Headers

            Content-Type: application/x-www-form-urlencoded

    + Body

            form-data: { file: data }

## Responses
+ 200

    + Headers

             Content-Type: application/pdf

    + Body

             doc or docx file

+ 404

    + Body

             {
                 "error": "File not found"
             }
+ 400

    + Body

             {
                 "error": "Wrong file type"
             }
