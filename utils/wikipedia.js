var axios = require('axios');
var lodash = require('lodash');
var striptags = require('striptags');

var BASE_URL = 'https://commons.wikimedia.org/w/api.php';

var WikipediaAPI = {
    _makeRequest: function(date, limit, offset){
        var gsrsearch = `filetype:bitmap insource:/[dD]ate=\s{0,1}${date}/`;

        var params = {
            format: 'json',
            action: 'query',
            generator: 'search',
            gsrnamespace: 6, // files
            gsrsearch: gsrsearch,
            gsrwhat: 'text',
            gsrlimit: limit,
            prop: 'imageinfo',
            iiprop: 'url|extmetadata',
            gsroffset: offset,
            iiurlwidth: 1200,
        };

        return axios.get(BASE_URL, { params: params })
    },
    searchByDate: function(date, limit=25, offset=0) {
        return WikipediaAPI._makeRequest(date, limit, offset)
        .then(response => {
            if (!response.data.query) {
                return [];
            } else {
                return lodash.map(response.data.query.pages, function(page){
                    var description = null;
                    var metadata = page.imageinfo[0].extmetadata;
                    if (metadata.ImageDescription && metadata.ImageDescription.value) {
                        description = striptags(metadata.ImageDescription.value);
                    }
                    return {
                        page_id: page.pageid,
                        title: page.title,
                        index: page.index,
                        image_url: page.imageinfo[0].url,
                        description_url: page.imageinfo[0].descriptionurl,
                        scaled_url: page.imageinfo[0].thumburl,
                        description: description
                    }
                });
            }
        });
    }
};

module.exports = WikipediaAPI;
