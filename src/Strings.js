// ================================== STRINGS =================================

/* global jUtils:true */

/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf jUtils.Strings
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
jUtils.format = function (str) {
  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};

jUtils.microTemplate = function(str, obj) {
  // TODO: Implement, test
  for(var prop in obj) {
    str=str.replace(new RegExp('{{'+prop+'}}','g'), obj[prop]);
  }
  return str;
};

jUtils.hashCode = function(str){
  //TODO: Doc, test
  var hash = 0,
      i, len, c;
  if (str.length === 0) return hash;
  for (i=0, len=str.length; i<len; i++) {
      c     = str.charCodeAt(i);
      hash  = ((hash<<5)-hash)+c;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Stored and returns text translations.
 * @requires JUtils.hashCode
 * @param  {String} str         Text to be translated.
 * @param  {String} lang        The language.
 * @param  {String} translation If specified, stores the translation.
 * @return {String}             Translated text.
 */
jUtils.translate = function(str, lang, translation) {
  var translations = jUtils.getVariable('translations'),
      strHash;
  if (!translations) translations = jUtils.storeVariable('translations', {});
  if (jUtils.isString(str) && jUtils.isString(lang)) {
    strHash = jUtils.hashCode(str + lang);
    if (jUtils.isString(translation)) {
      // Store the translation
      translations[strHash] = translation;
      return translation;
    } else {
      // Return the translation
      return translations[strHash];
    }
  } else {
    throw new TypeError('You must provide at least a string and language');
  }
};

jUtils.slugify = function(str) {
  //TODO: Doc, test
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;",
      to   = "aaaaaeeeeeiiiiooooouuuunc------",
      i, len;

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  for (i=0, len=from.length ; i<len ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

