public class Card {
    private String name;
    private double price;
    private String url;
    private String picture;
    private int id;

    public Card(String name, double price, String url, int id, String picture) {
        this.name = name;
        this.price = price;
        this.url = url;
        this.picture = picture;
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "Card{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", url='" + url + '\'' +
                ", number=" + id +
                ", picture='" + picture + '\'' +
                '}';
    }

    public String getPicture() {
        return picture;
    }

    public int getNumber() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setId(int id) {
        this.id = id;
    }
}
