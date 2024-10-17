export let request = `"seo": {title,description,slug,robots,canonical,schema,"ogimage":ogimage.asset->url},
      content[]{
        _type == "block" => {..., markDefs[]{..., _type == "internalLink" =>{...,"href":reference->slug}} , _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}},
        _type == "feature" => {_type, id, heading, subheading, factsHeadingLevel, listOfFacts[]{heading, subheading, img{alt,duotone,'src':asset->url}}},
        _type == "hero" => {_type, id, layout, fullscreen, duotone, blur, imgsize, opacity, textcolor, texte[]{...,_type=="button"=>{color,content,href{isExt,linkExt,'linkInt':linkInt->slug}}},img{alt,'src':asset->url}},
        _type == "section" => {_type, id, text[]{...,_type=="button"=>{color,content,href{isExt,linkExt,'linkInt':linkInt->slug}}}, bg, img{alt,duotone,'src':asset->url}},
        _type == "tableofcontent" => {_type, id, order, title, items[]{toctext,toctitle,level,img{alt,duotone,'src':asset->url}}},
        _type == "biglist" => {_type, id, order, size, title, items[]{itemtitle, itemtext, img{'src':asset->url}}},
        _type == "biglist2" => {_type, id, order, size, title, items[]{itemtitle, itemtext, img{'src':asset->url}}},
        _type == "productlist" => {_type, height, col, id, title, hasfilter, products[]{producttitle, filters, 'link':link->slug, level, img{alt, duotone, 'src':asset->url},isExt, 'linkInt':linkInt->slug, linkExt, itemtext[]{..., _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}}}},
        _type == "map" => {_type, id, img{alt,duotone,'src':asset->url},title[]{..., _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}}, poi[]{coord,name,content[]{..., _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}},poiimg{alt,duotone,'src':asset->url}}},
        _type == "logogallery" => {_type, id, title[]{..., _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}}, logos[]{link,img{alt,'src':asset->url}}},
        _type == "actupreview" => {_type, id, "actus":actus[]->{h1,abstract,date,slug,img{alt, 'src':asset->url}}, title[]{..., _type == "button" => {color, size, href{isExt, 'linkInt':linkInt->slug, linkExt}}}},
        _type == "timeline" => {_type,id,title,events},
        _type == "video" => {_type, id, title, ytID, img{alt,duotone,'src':asset->url}},
        _type == "team" => {_type, id,title,members[]->{...,img{'src':asset->url}}},
        _type == "contactmap" => {_type, id, title, address, mail, tel,horaires, mapImg{'src':asset->url},iframesrc},
        _type == "testimonials" => {_type, id, title, testimonials},
        _type == 'contactform' => {_type,id,title, formName, form},
        _type == 'title' => {_type, id, content, img{alt,duotone,'src':asset->url}},
        _type == 'tabs' => {_type, id, onglets[]{title,content[]{...,_type=='img'=>{"alt":img.alt,"duotone":img.duotone,'src':img.asset->url}}}, title, baseline},
        _type == 'cta' => {_type, id, content, img{alt,duotone,'src':asset->url}},
        _type == "productlistcat" => {_type, id, height, col, title, hasfilter, cat},
        _type == 'steps' => {_type, id, title, steps},
        _type == 'faq' => {_type, id, title, faq},
      }`;
