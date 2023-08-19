<img title="a title" src="Node.js_logo.png">


# JS File Manager
Microservice API done with Express and Node FS, where you can manage file.

The most prominent feature is an endpoint where you can split a file from an ascii char into multiple files. They will be returned to you in a ZIP file.

<strong>Example: </strong> Divide this 10000 line file where each file has 2000 lines. The answer will be a ZIP containing 5 files where each file will have 2000 lines.

# JS PDF Generator
Microservice API done with Express and Puppetter , where can you generate PDFs passing an HTML template.

To use it you need a template in HTML format and a JSON with the data to fill in the template.

What I like is that it is very flexible in terms of template, since you can insert Bootstrap, or fonts from Google Fonts in the HTML.

<h3>Variables</h3>
<ul>
  <li><b> --text:KEY </b> -> Prints standard text. Change KEY to your property name. <i>Examples: <b>--text:doctor</b> / <b>--text:client.code</b></i></li>
  <li><b> --repeat:KEY </b> -> Repeats a container with data dynamically. Has to used inside an HTML tag. Change KEY to your property name. Example:
    
    <tr --repeat:dental-work >
          <td>--text:description</td>
          <td>--text:pieces</td>
          <td>€<span>--text:price-unit</span></td>
          <td>--text:acts</td>
          <td>€<span>--text:total</span></td>
      </tr>
     
  </li>
</ul>
<h3>Funcionalities</h3>
<ul>
  <li>
    <p><b>Allows printing a JSON object. </b><br/>Example JSON replacement variable and usage.</p>

    {
        "key": "company",
        "value": {
            "name": "Smile Dental",
            "address": {
                "street": "Avda. Espacio, 18 - Centro Comercial La Plaza",
                "postal-code": "28031",
                "city": "VILLA DE VALLECAS"
            },
            "tel": "999999999",
            "nif": "B11111111"
        }
    }
 
     <div class="mb-5">
        <div class="text1 text-capitalize">--text:company.name</div>
        <div>--text:company.address.street</div>
        <div><span>--text:company.address.postal-code</span> <span>--text:company.address.city</span></div>
        <div><span class="fw-bold text-uppercase me-2">TEL:</span>--text:company.tel</div>
        <div><span class="fw-bold text-uppercase me-2">NIF:</span>--text:company.nif</div>
    </div>

  </li>
</ul>

# TS-MAIL-SENDER
API Microservice that sends emails using Express and NodeMailer. 

This microservice was created to experimient node with typescript

