# Insights

### _add(insightObj, cb)_
function to add a new insight, where `insightObj` takes the form:
```js
{
  title: 'Insight Title',
  url: 'www.ce100-insight-url.com',
  doctype: '.pdf',
  author: 'EMF',
  org_id: null,
  creator_id: 1,
  resource: true,
  active: true
}
```
On the successful save, the new insight's ID (generated by postgres) is returned.
