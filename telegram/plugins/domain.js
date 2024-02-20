// plugins/domain.js
const axios = require('axios');

function subDomain(host, ip, index) {
    return new Promise((resolve) => {
        // Add your Cloudflare API credentials and other parameters here
        let zone = "a97316c2d6861ec74fc8b63282d7b54f";
        let apitoken = "XrhLR2AB9e5RvHs-BQJiFI3v_SEx-7q57HcffiDn";
        let tld = "dzxak.my.id";

        axios.post(
            `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
            {
                type: "A",
                name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld,
                content: ip.replace(/[^0-9.]/gi, ""),
                ttl: 3600,
                priority: 10,
                proxied: false
            },
            {
                headers: {
                    Authorization: "Bearer " + apitoken,
                    "Content-Type": "application/json",
                },
            }
        ).then((e) => {
            let res = e.data;
            if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content, index });
        }).catch((e) => {
            let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
            let err1Str = String(err1);
            resolve({ success: false, error: err1Str, index });
        });
    });
}

module.exports = {
    subDomain1: (host, ip) => subDomain(host, ip, 1),
    subDomain2: (host, ip) => subDomain(host, ip, 2),
    // ... repeat for subDomain3 to subDomain20
};