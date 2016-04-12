export let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

export function getWrapperProps() {
  return {
    'class': 'hello',
    'data-root': 'hithere'
  }
}

export function matchChannelsToTerm (channel, value) {
  return (
    channel.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    channel.abbr.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    value === "Release Channels"
  )
}

export function sortChannels (a, b, value) {
  return (
    a.name.toLowerCase().indexOf(value.toLowerCase()) >
    b.name.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
  )
}

export function fakeRequest (value, cb) {
  if (value === '')
    return getStates()
  var items = getStates().filter((state) => {
    return matchStateToTerm(state, value)
  })
  setTimeout(() => {
    cb(items)
  }, 500)
}

export function getReleaseChannels() {
  return [
  {'abbr': 'aurora', 'name': 'Dev Edition' },
   {'abbr': 'beta', 'name': 'Beta' },
   {'abbr': 'nightly', 'name': 'Nightly'},
   {'abbr': 'release', 'name':  'Release' }];
}




