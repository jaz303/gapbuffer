# gapbuffer

This is a pure Javascript implementation of a [gap buffer](http://en.wikipedia.org/wiki/Gap_buffer), an array-backed data structure optimised for insertion and deletion operations which are clustered near the same location.

## API

    // create a new gap buffer with a gap-size of 128
    var gb = new GapBuffer(128);
    
    // insert some objects
    gb.insert(0, "foo");
    gb.insert(1, "bar");
    
    // read them back
    gb.get(0); // => "foo"
    gb.get(1); // => "bar"
    gb.get(2); // => undefined
    
    // get the number of items in the buffer
    gb.length; // => 2
    
    // convert to array
    gb.asArray(); // => ["foo", "bar"]
    
    // clear the buffer
    gb.clear();
    gb.asArray(); // => []
    
## Benchmarks

Based on a random insert-only fuzz test, this implementation trounces a naive array-based approach:

    gap buffer
    Raw:
     > 0.05699304684828451
    Average (mean) 0.05699304684828451

    array
    Raw:
     > 0.006028963138919368
    Average (mean) 0.006028963138919368

    Winner: gap buffer
    Compared with next highest (array), it's:
    89.42% faster
    9.45 times as fast
    0.98 order(s) of magnitude faster
    QUITE A BIT FASTER
