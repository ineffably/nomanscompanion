export default {
  getItemFromName: (name, data) => {
    const item = data.Items.filter(item => item.Name === name);
    if(item.length > 0){
      return item[0];
    }
    return null;
  }
}