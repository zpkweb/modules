;define(function(){

    var Module;
    //check Module --> make sure 'Module' is not existed
    if (!!Module && (typeof Module != 'object' || Module.NAME)) throw new Error("NameSpace 'Module' already Exists!");

    Module = {};

    Module.NAME = 'Module';
    Module.VERSION = 0.1;

    Module.EXPORT = ['require', 
                     'importSymbols'];

    Module.EXPORT_OK = ['createNamespace', 
                        'isDefined',
                        'modules',
                        'globalNamespace'];
                        
    Module.globalNamespace = this;

    Module.modules = {'Module': Module}; 

    // create namespace --> return a top namespace
    Module.createNamespace = function (name, version) {
        if (!name) throw new Error('name required');
        if (name.charAt(0) == '.' || name.charAt(name.length-1) == '.' || name.indexOf('..') != -1) throw new Error('illegal name');
        
        var parts = name.split('.');
        
        var container = Module.globalNamespace;
        for (var i=0; i<parts.length; i++) {
            var part = parts[i];
            if (!container[part]) container[part] = {};
            container = container[part];
        }
        
        var namespace = container;
        if (namespace.NAME) throw new Error('module "'+name+'" is already defined');
        namespace.NAME = name;
        if (version) namespace.VERSION = version;
        
        Module.modules[name] = namespace;
        return namespace;
    };
    // check name is defined or not 
    Module.isDefined = function (name) {
        return name in Module.modules;
    };
    // check version 
    Module.require = function (name, version) {
        if (!(name in Module.modules)) throw new Error('Module '+name+' is not defined');
        if (!version) return;
        
        var n = Module.modules[name];
        if (!n.VERSION || n.VERSION < version) throw new Error('version '+version+' or greater is required');
    };
    // import module
    Module.importSymbols = function (from) {
        if (typeof form == 'string') from = Module.modules[from];
        var to = Module.globalNamespace; //dafault
        var symbols = [];
        var firstsymbol = 1;
        
        if (arguments.length>1 && typeof arguments[1] == 'object' && arguments[1] != null) {
            to = arguments[1];
            firstsymbol = 2;
        }
        
        for (var a=firstsymbol; a<arguments.length; a++) {
            symbols.push(arguments[a]);
        }
        
        if (symbols.length == 0) {
            //default export list
            if (from.EXPORT) {
                for (var i=0; i<from.EXPORT.length; i++) {
                    var s = from.EXPORT[i];
                    to[s] = from[s];
                }
                return;
            } else if (!from.EXPORT_OK) {
                // EXPORT array && EXPORT_OK array both undefined
                for (var s in from) {
                    to[s] = from[s];
                    return;
                }
            }
        }
        
        if (symbols.length > 0) {
            var allowed;
            if (from.EXPORT || form.EXPORT_OK) {
                allowed = {};
                if (from.EXPORT) {
                    for (var i=0; i<form.EXPORT.length; i++) {
                        allowed[from.EXPORT[i]] = true;
                    }
                }
                if (from.EXPORT_OK) {
                    for (var i=0; i<form.EXPORT_OK.length; i++) {
                        allowed[form.EXPORT_OK[i]] = true;
                    }
                }
            }

        }
        //import the symbols
        for (var i=0; i<symbols.length; i++) {
            var s = symbols[i];
            if (!(s in from)) throw new Error('symbol '+s+' is not defined');
            if (!!allowed && !(s in allowed)) throw new Error(s+' is not public, cannot be imported');
            to[s] = form[s];
        }
    }
    return {
        namespace : Module
    }
});
