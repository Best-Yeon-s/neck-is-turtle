package com.example.neckisturtle.core;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class resultMap implements Map<String, Object> {

    private Map<String, Object> map = new HashMap<>();

    @Override
    public void clear() {
        this.map.clear();
    }

    @Override
    public boolean containsKey(Object arg0) {
        return this.map.containsKey(arg0);
    }

    @Override
    public boolean containsValue(Object arg0) {
        return this.map.containsValue(arg0);
    }

    @Override
    public Set<Entry<String, Object>> entrySet() {
        return this.map.entrySet();
    }

    @Override
    public Object get(Object arg0) {
        return this.map.get(arg0);
    }

    public String getString(Object arg0) {
        return this.map.get(arg0).toString();
    }

    @Override
    public boolean isEmpty() {
        return this.map.isEmpty();
    }

    @Override
    public Set<String> keySet() {
        return this.map.keySet();
    }

    @Override
    public Object put(String arg0, Object arg1) {
        String tempKey = arg0.toUpperCase();
        StringBuffer sb = new StringBuffer();
        if (tempKey.indexOf("_") >= 0) {
            for (String s : tempKey.split("_")) {
                if (sb.length() > 1) {
                    sb.append(Character.toUpperCase(s.charAt(0)));
                } else {
                    sb.append(Character.toLowerCase(s.charAt(0)));
                }
                if (s.length() > 1) {
                    sb.append(s.substring(1, s.length()).toLowerCase());
                }
            }
        } else {
            sb.append(arg0);
        }

        String key = new String(sb);

        return this.map.put(key, arg1);
    }

    @Override
    public void putAll(Map<? extends String, ? extends Object> arg0) {

    }

    @Override
    public Object remove(Object arg0) {
        return this.map.remove(arg0);
    }

    @Override
    public int size() {
        return this.map.size();
    }

    @Override
    public Collection<Object> values() {
        return this.map.values();
    }
}

