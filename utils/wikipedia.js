var axios = require('axios');
var lodash = require('lodash');

var BASE_URL = 'https://commons.wikimedia.org/w/api.php';

var WikipediaAPI = {
    searchByDate: function(date, offset=0) {
        var gsrsearch = `insource:/[dD]ate=\s{0,1}${date}/`;
        
        var params = {
            format: 'json',
            action: 'query',
            generator: 'search',
            gsrnamespace: 6, // files
            gsrsearch: gsrsearch,
            gsrwhat: 'text',
            gsrlimit: 25,
            prop: 'imageinfo',
            iiprop: 'url',
            gsroffset: offset
        };
        
        return axios.get(BASE_URL, { params: params })
        .then(response => {
            if (!response.data.query) {
                return [];
            } else {
                return lodash.map(response.data.query.pages, function(page){
                    return {
                        page_id: page.pageid,
                        title: page.title,
                        index: page.index,
                        image_url: page.imageinfo[0].url,
                        description_url: page.imageinfo[0].descriptionurl 
                    }
                });
            }
        });
    }
};

module.exports = WikipediaAPI;