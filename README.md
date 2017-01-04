# Insights

### _getById(insightId, cb)_
function to return the details of a specific insight, where `insightId` is the ID of the insight to retrieve.

The insight details take the following format:

```js
[{
  id: 1,
  date: 2016-12-23T11:27:41.760Z,
  title: 'Insight Number 1',
  url: 'https://....',
  tags: [
  {
    tag_id: 8,
    tag_name: 'Agriculture'
  }, {
    tag_id: 22,
    tag_name: 'Telecommunications'
  }, {
  ...
}]
```
