const axios = require("axios");
const cheerio = require("cheerio");
const crawlData = async () => {
  try {
    const result = await axios.get(
      "https://sepolia.etherscan.io/address/0xd904F655244c9e2adAc524B4C166e15429F49E5F"
    );
    const returnData = [];
    const $ = cheerio.load(result.data);
    const table = $(".table-responsive").eq(0);
    const bodyTable = table.find("tbody").eq(0).find("tr");
    const data = bodyTable.map((item, index) => {
      const listData = bodyTable.eq(item);
      const transactionHash = listData.find("td").eq(1).text();
      const method = listData.find("td").eq(2).text();
      const block = listData.find("td").eq(3).text();
      const age = listData.find("td").eq(5).text();
      const from = listData
        .find("td")
        .eq(7)
        .find("span")
        .eq(0)
        .attr("data-highlight-target");
      const from1 = listData
        .find("td")
        .eq(7)
        .find("span")
        .eq(0)
        .find("span")
        .eq(0)
        .attr("data-highlight-target");
      const status = listData.find("td").eq(8).text();
      const to = listData
        .find("td")
        .eq(9)
        .find("span")
        .eq(0)
        .attr("data-highlight-target");
      const to1 = listData
        .find("td")
        .eq(9)
        .find("span")
        .eq(0)
        .find("span")
        .eq(0)
        .attr("data-highlight-target");
      const value = listData.find("td").eq(10).text();
      const fee = listData.find("td").eq(11).text();
      returnData.push({
        transactionHash,
        block,
        method,
        age,
        from: from || from1,
        to: to || to1,
        value,
        status,
        fee,
      });
    });

    return returnData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  crawlData,
};
